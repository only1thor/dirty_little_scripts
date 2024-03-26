# This almost works. still need to take care of some escaping on longer error messages. 
stern -n (kubens -c) -c app . -o json | jq '.message' | sed 's/^.\(.*\).$/\1/' | sed 's/\\\"/"/g' | jq
