FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    wget \
    tar \
    bash \
    make \
    r-base \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js tools
RUN npm install -g markdownlint-cli2

# Install Vale based on architecture
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        wget https://github.com/errata-ai/vale/releases/download/v3.0.0/vale_3.0.0_Linux_64-bit.tar.gz && \
        tar -xvf vale_3.0.0_Linux_64-bit.tar.gz && \
        mv vale /usr/local/bin/ && \
        rm vale_3.0.0_Linux_64-bit.tar.gz; \
    elif [ "$ARCH" = "arm64" ]; then \
        wget https://github.com/errata-ai/vale/releases/download/v3.0.0/vale_3.0.0_Linux_arm64.tar.gz && \
        tar -xvf vale_3.0.0_Linux_arm64.tar.gz && \
        mv vale /usr/local/bin/ && \
        rm vale_3.0.0_Linux_arm64.tar.gz; \
    else \
        echo "Unsupported architecture: $ARCH" && exit 1; \
    fi

# Install lychee based on architecture
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        wget https://github.com/lycheeverse/lychee/releases/download/lychee-v0.21.0/lychee-x86_64-unknown-linux-gnu.tar.gz && \
        tar -xvf lychee-x86_64-unknown-linux-gnu.tar.gz && \
        mv lychee /usr/local/bin/ && \
        rm lychee-x86_64-unknown-linux-gnu.tar.gz; \
    elif [ "$ARCH" = "arm64" ]; then \
        wget https://github.com/lycheeverse/lychee/releases/download/lychee-v0.21.0/lychee-aarch64-unknown-linux-gnu.tar.gz && \
        tar -xvf lychee-aarch64-unknown-linux-gnu.tar.gz && \
        mv lychee /usr/local/bin/ && \
        rm lychee-aarch64-unknown-linux-gnu.tar.gz; \
    else \
        echo "Unsupported architecture: $ARCH" && exit 1; \
    fi

# Install Gitleaks based on architecture
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        wget https://github.com/gitleaks/gitleaks/releases/download/v8.21.2/gitleaks_8.21.2_linux_x64.tar.gz && \
        tar -xvf gitleaks_8.21.2_linux_x64.tar.gz && \
        mv gitleaks /usr/local/bin/ && \
        rm gitleaks_8.21.2_linux_x64.tar.gz; \
    elif [ "$ARCH" = "arm64" ]; then \
        wget https://github.com/gitleaks/gitleaks/releases/download/v8.21.2/gitleaks_8.21.2_linux_arm64.tar.gz && \
        tar -xvf gitleaks_8.21.2_linux_arm64.tar.gz && \
        mv gitleaks /usr/local/bin/ && \
        rm gitleaks_8.21.2_linux_arm64.tar.gz; \
    else \
        echo "Unsupported architecture: $ARCH" && exit 1; \
    fi

# Install Python dependencies
COPY requirements.txt /tmp/requirements.txt
RUN pip3 install --no-cache-dir --break-system-packages -r /tmp/requirements.txt

WORKDIR /workspace

CMD ["/bin/bash"]

