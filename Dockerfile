# 使用 Python 基礎映像
FROM python:3.10-slim

# 設定工作目錄
WORKDIR /app

# 複製 pyproject.toml 和 poetry.lock 並安裝依賴
COPY pyproject.toml poetry.lock* /app/
RUN pip install poetry && poetry install --no-root

# 複製專案文件
COPY . /app/

# 安裝 uwsgi
RUN poetry add uwsgi

# 設定環境變數
ENV PORT 8000 \
    TZ=Asia/Taipei \
    PYTHONUNBUFFERED=1


CMD uwsgi -w app:app --http :$PORT

