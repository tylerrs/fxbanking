fx_version "adamant"
game "gta5"
description "fxbanking"
lua54 "yes"

ui_page "nui/index.html"
files {
    "nui/*.html",
    "nui/*.css",
    "nui/*.js",
    "nui/*.png",
}

client_scripts {
    "config.lua",
    "client.lua"
}

server_scripts {
    "config.lua",
    "server.lua"
}