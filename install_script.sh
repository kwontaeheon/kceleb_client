#!/bin/bash

set -x

patterns=('*.html' '*.js' 'favicon*' '*.css' '*.png' 'img' 'ads.txt', 'app-ads.txt')

wp_path=/home/ubuntu/wordpress/wordpress
git_path=/home/ubuntu/wordpress/kceleb_client
cd $git_path
for pat in ${patterns[@]}; do 
	sudo rm -rf $wp_path/$pat
	sudo cp -r $pat $wp_path/
	sudo chown -R 82:82 $wp_path/$pat
done
