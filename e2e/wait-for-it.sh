#!/bin/sh
# wait-for-it.sh: Wait for services to be ready

set -e

host1="$1"
port1="$2"
host2="$3"
port2="$4"
shift 4
cmd="$@"

# Function to check if a service is ready
check_service() {
  local host=$1
  local port=$2
  echo "Checking if $host:$port is available..."
  
  for i in $(seq 1 30); do
    if nc -z "$host" "$port" > /dev/null 2>&1; then
      echo "$host:$port is available"
      return 0
    fi
    echo "Waiting for $host:$port... $i/30"
    sleep 2
  done
  
  echo "Timeout waiting for $host:$port"
  return 1
}

# Check if frontend is ready
check_service "$host1" "$port1" || exit 1

# Check if backend is ready
check_service "$host2" "$port2" || exit 1

# Execute the command
echo "Services are ready, executing: $cmd"
exec $cmd