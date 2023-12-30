#!/bin/bash

set -x


wp_path=/home/ubuntu/wordpress/wordpress/puppy
git_path=/home/ubuntu/wordpress/kceleb-mbti-2
cd $git_path
sudo rm -rf $wp_path
sudo cp -r $git_path $wp_path
sudo chown -R 82:82 $wp_path

