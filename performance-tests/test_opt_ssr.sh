#!/bin/bash

apps=("optimized-ssr")
networks=("fast" "middle-speed"  "slow")


# Network settings (kbps)
declare -A downloadSpeeds=( ["fast"]=100000 ["middle-speed"]=10000 ["slow"]=400 )
declare -A uploadSpeeds=( ["fast"]=30000 ["middle-speed"]=5000 ["slow"]=400 )
declare -A latencies=( ["fast"]=30 ["middle-speed"]=200 ["slow"]=400 )

for app in "${apps[@]}"; do
  base_url="https://${app}-app.vercel.app"

  for net in "${networks[@]}"; do
    echo "Testing $app under $net network..."

    # Network parameters
    down=${downloadSpeeds[$net]}
    up=${uploadSpeeds[$net]}
    latency=${latencies[$net]}

    output_dir="results/$app/$net"

    docker run --rm \
      -v "$(pwd)/$output_dir:/sitespeed.io" \
      sitespeedio/sitespeed.io:38.1.1 \
      --preURL "${base_url}/" --preURL "${base_url}/posts" --preURL "${base_url}/post/4985cf07-e496-492c-965c-329159587b8d" \
      "${base_url}/" "${base_url}/posts" "${base_url}/post/4985cf07-e496-492c-965c-329159587b8d"  \
      --browsertime.connectivity.profile custom \
      --browsertime.connectivity.engine tc \
      --browsertime.connectivity.down "$down" \
      --browsertime.connectivity.up "$up" \
      --browsertime.connectivity.latency "$latency" \
      --browsertime.skipHar \
      --browsertime.cacheClearRaw \
      --video false \
      --visualMetrics false \
      --html.showAllWaterfalls false \
      --summary-detail false \
      -n 10
  done
done



