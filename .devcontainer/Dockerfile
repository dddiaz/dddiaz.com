FROM mcr.microsoft.com/devcontainers/universal:2-linux

# The base universal image installs the latest version of Hugo
# This causes an issue when I want to use my pinned version as a Dev Container Feature.
RUN rm -rf /usr/local/hugo

# Overwrite first run notice
RUN rm -f /usr/local/etc/vscode-dev-containers/first-run-notice.txt
COPY first-run-notice.txt /usr/local/etc/vscode-dev-containers/