import time
from pathlib import Path
from app.utils.files import sanitize_filename, create_safe_job_directory, safe_remove_directory
from app.services.cleanup_service import cleanup_expired_files


def test_sanitize_filename():
    assert sanitize_filename("My Video: Super *Cool*?") == "My_Video_Super_Cool"
    assert sanitize_filename("../../etc/passwd") == "etc_passwd"
    assert sanitize_filename("") != ""


def test_job_directory_lifecycle(tmp_path: Path):
    job_dir = create_safe_job_directory(tmp_path)
    assert job_dir.exists()
    assert job_dir.is_dir()
    assert str(job_dir).startswith(str(tmp_path))

    # Safe remove
    assert safe_remove_directory(job_dir) is True
    assert not job_dir.exists()


def test_cleanup_expired_files(tmp_path: Path):
    old_dir = tmp_path / "old_job"
    old_dir.mkdir()
    # create a dummy file inside
    (old_dir / "test.mp4").write_text("sample")

    # Manually modify mtime to simulate an expired folder (e.g. 1000s ago)
    past_time = time.time() - 1000
    import os
    os.utime(old_dir, (past_time, past_time))

    new_dir = tmp_path / "new_job"
    new_dir.mkdir()

    purged = cleanup_expired_files(temp_dir=tmp_path, max_age_seconds=500)
    assert purged == 1
    assert not old_dir.exists()
    assert new_dir.exists()
