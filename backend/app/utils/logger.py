import json
import logging
import sys
from datetime import datetime, timezone
from typing import Any, Dict, Optional


class StructuredJsonFormatter(logging.Formatter):
    """Custom formatter emitting structured JSON logs without leaking credentials."""

    SENSITIVE_KEYS = {"password", "token", "cookie", "cookies", "authorization", "secret", "key"}

    def format(self, record: logging.LogRecord) -> str:
        log_entry: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }

        # Include custom attributes attached via extra
        if hasattr(record, "request_id"):
            log_entry["request_id"] = record.request_id
        if hasattr(record, "platform"):
            log_entry["platform"] = record.platform
        if hasattr(record, "operation"):
            log_entry["operation"] = record.operation
        if hasattr(record, "duration_ms"):
            log_entry["duration_ms"] = record.duration_ms
        if hasattr(record, "status"):
            log_entry["status"] = record.status
        if hasattr(record, "error_category"):
            log_entry["error_category"] = record.error_category

        # Filter out sensitive keys from extras
        for key, value in record.__dict__.items():
            if key not in log_entry and not key.startswith("_") and key not in {
                "args", "asctime", "created", "exc_info", "exc_text", "filename",
                "funcName", "id", "levelname", "levelno", "lineno", "module",
                "msecs", "msg", "name", "pathname", "process", "processName",
                "relativeCreated", "stack_info", "thread", "threadName"
            }:
                if any(sens in key.lower() for sens in self.SENSITIVE_KEYS):
                    log_entry[key] = "[REDACTED]"
                else:
                    log_entry[key] = value

        if record.exc_info:
            # We log exception type and safe summary, avoiding raw stack trace exposure to user
            exc_type, exc_val, _ = record.exc_info
            log_entry["exception_type"] = exc_type.__name__ if exc_type else "UnknownException"
            log_entry["exception_message"] = str(exc_val)

        return json.dumps(log_entry)


def setup_logger(name: str = "link2save") -> logging.Logger:
    """Configures and returns a structured logger."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(StructuredJsonFormatter())
    logger.addHandler(handler)
    logger.propagate = False
    return logger


logger = setup_logger()
