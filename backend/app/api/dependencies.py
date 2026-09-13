from fastapi import Request, HTTPException, status
from app.services.rate_limiter import rate_limiter
from app.utils.logger import logger


def get_client_ip(request: Request) -> str:
    """Extract client IP from headers or connection, safely."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        # Take the leftmost untrusted IP
        client_ip = forwarded.split(",")[0].strip()
        if client_ip:
            return client_ip

    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()

    if request.client and request.client.host:
        return request.client.host

    return "127.0.0.1"


async def verify_rate_limit(request: Request):
    """Enforce request rate limiting based on client IP."""
    client_ip = get_client_ip(request)
    if not rate_limiter.is_allowed(client_ip):
        logger.warning(
            f"Rate limit exceeded for IP {client_ip}",
            extra={"operation": "rate_limit", "status": "blocked"}
        )
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "code": "RATE_LIMIT_EXCEEDED",
                "message": "Too many requests. Please try again shortly.",
            },
        )
