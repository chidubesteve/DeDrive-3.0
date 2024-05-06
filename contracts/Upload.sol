// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
contract Upload {
          //struct
    struct Access {
        address user;
        bool access;
    }
    //mappings
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool))  ownership;
    mapping(address => Access[]) public accessList;
    mapping(address => bool) accessed;
    address[] keys;
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string calldata url) external {
        value[_user].push(url);
    }


    function allow(address _user) external {
        ownership[msg.sender][_user] = true;

        if (!accessed[_user]) {
            accessed[_user] = true;
            keys.push(_user);
        }

        if (previousData[msg.sender][_user]) {
            for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==_user){
                  accessList[msg.sender][i].access=true; 
             }
         }
            } else {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;

            }
    }

function disallow(address _user) external {
    ownership[msg.sender][_user] = false;
    
    // Find the index of the Access struct in accessList corresponding to _user
    for (uint i = 0; i < accessList[msg.sender].length; i++) {
        if (accessList[msg.sender][i].user == _user) {
            accessList[msg.sender][i].access = false;
            break;
        }
    }

    if (accessed[_user]) {
        accessed[_user] = false;
        for (uint i = 0; i < keys.length; i++) {
            if (keys[i] == _user) {
                keys[i] = keys[keys.length - 1];
                keys.pop();
                break;
            }
        } 
    }
}

    function display(address _user) external view returns (string[] memory) {
    require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access!");
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
    