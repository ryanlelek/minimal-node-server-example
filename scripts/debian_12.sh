#!/usr/bin/env bash

# Debian 12 Bookworm
# Tested only on x86_64
#
# Pick from 20.x (LTS) or 22.x
NODE_VERSION="20.x";

UID_RUN=$(id -u);
if [ "${UID_RUN}" -ne 0 ]; then
  echo "Run this script as root";
  exit
else
  echo "Running as root...";
fi

# Change to /root
cd /root || exit;

# Upgrade System
apt-get update;
apt-get dist-upgrade -y;
apt-get autoremove;

# Install NodeSource GPG Key and Repo
apt-get install -y apt-transport-https ca-certificates curl gnupg;
mkdir -p /usr/share/keyrings/;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_VERSION} nodistro main" > /etc/apt/sources.list.d/nodesource.list;
apt-get update;
apt-get install -y nodejs;

# Install Dependencies
cd /root/minimal-node-server-example || exit;
npm install;

# Install systemd Service
cat << EOF > /etc/systemd/system/minimal.service;
[Unit]
Description=minimal

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=/root/minimal-node-server-example
ExecStart=npm start
Restart=always
RestartSec=3
StartLimitBurst=5
StartLimitInterval=0
StandardOutput=journal
StandardError=journal
SyslogIdentifier=minimal
TimeoutSec=60

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload;
systemctl enable minimal;

# Reboot Machine
touch /root/rebooted;
reboot;
