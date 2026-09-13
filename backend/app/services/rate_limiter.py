import time
from collections import defaultdict
from typing import Dict, List
from app.config import settings


class InMemoryRateLimiter:
    """
    Sliding-window in-memory rate limiter per client IP.
    Can be replaced with a Redis-backed implementation in the future.
    """

    def __init__(self, max_requests: int = 20, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: Dict[str, List[float]] = defaultdict(list)

    def is_allowed(self, client_ip: str) -> bool:
        """Check if request from client_ip is permitted under current rate limit."""
        now = time.time()
        window_start = now - self.window_seconds

        # Prune old timestamps for this IP
        timestamps = [ts for ts in self.requests[client_ip] if ts > window_start]
        self.requests[client_ip] = timestamps

        if len(timestamps) >= self.max_requests:
            return False

        self.requests[client_ip].append(now)
        return True

    def reset(self):
        """Clear all stored rate limit history."""
        self.requests.clear()


# Global rate limiter instance initialized with settings
rate_limiter = InMemoryRateLimiter(
    max_requests=settings.RATE_LIMIT_PER_MINUTE,
    window_seconds=60,
)
