#!/bin/bash

apps=("original-csr" "optimized-csr" "original-ssr" "optimized-ssr")
networks=("fast" "middle-speed" "slow")
paths=(
  "/"
  "/posts"
  "/post/4985cf07-e496-492c-965c-329159587b8d"
)

# Network settings (kbps)
declare -A downloadSpeeds=( ["fast"]=100000 ["middle-speed"]=50000 ["slow"]=1000 )
declare -A uploadSpeeds=( ["fast"]=30000 ["middle-speed"]=15000 ["slow"]=1000 )
declare -A latencies=( ["fast"]=5 ["middle-speed"]=50 ["slow"]=100 )

for app in "${apps[@]}"; do
  base_url="https://${app}-app.vercel.app"

  for net in "${networks[@]}"; do
    echo "Testing $app under $net network..."

    # Network parameters
    down=${downloadSpeeds[$net]}
    up=${uploadSpeeds[$net]}
    latency=${latencies[$net]}

    output_dir="results/$app/$net"
    #mkdir -p "$output_dir"

    docker run --rm \
      -v "$(pwd)/$output_dir:/sitespeed.io" \
      sitespeedio/sitespeed.io:38.1.1 "${base_url}/" "${base_url}/posts" "${base_url}/post/4985cf07-e496-492c-965c-329159587b8d"  \
      --browsertime.connectivity.profile custom \
      --browsertime.connectivity.down "$down" \
      --browsertime.connectivity.up "$up" \
      --browsertime.connectivity.latency "$latency" \
      --browsertime.skipHar \
      --video false \
      --visualMetrics false \
      --html.showAllWaterfalls false \
      --summary-detail false \
      -n 3
  done
done



