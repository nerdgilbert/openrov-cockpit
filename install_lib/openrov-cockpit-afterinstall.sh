#!/bin/bash
set -x
set -e

# set the openrov startup
ln -s /opt/openrov/cockpit/linux/openrov.service /etc/init.d/openrov
chmod +x /opt/openrov/cockpit/linux/openrov.service
update-rc.d openrov defaults

chown -R rov /opt/openrov/cockpit
chgrp -R admin /opt/openrov/cockpit

mkdir -p /etc/nginx/locations-enabled
ln -s /opt/openrov/cockpit/linux/nginx.location /etc/nginx/locations-enabled/cockpit.conf


exit 0
