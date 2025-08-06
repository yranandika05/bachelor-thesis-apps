#!/bin/bash

apps=("original-csr" "optimized-csr" "original-ssr" "optimized-ssr")
networks=("4g" "3g" "cable")

paths=(
  "/"                                             # Homepage
  "/posts"                                        # All Posts
  "/post/4985cf07-e496-492c-965c-329159587b8d"    # Post Detail Page With Id '4985cf07-e496-492c-965c-329159587b8d'
)

for app in "${apps[@]}"; do
  base_url="https://${app}-app.vercel.app"

  for net in "${networks[@]}"; do
    echo "Testing $app under $net network..."

    output_dir="results/$app/$net"
    mkdir -p "$output_dir"

    for path in "${paths[@]}"; do
      # Generate a safe filename: remove slashes
      filename=$(echo "$path" | sed 's/\//_/g' | sed 's/^_//')
      if [ -z "$filename" ]; then filename="home"; fi

      sitespeed.io "${base_url}${path}" \
        --browsertime.connectivity.profile "$net" \
        --outputFolder "$output_dir/$filename" \
        --browsertime.skipHar \
        --browsertime.screenshot false \
        --video false \
        --visualMetrics false \
        --html.showAllWaterfalls false \
        --summaryDetail false \
        -n 1
    done
  done
done