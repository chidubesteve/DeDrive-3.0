// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Upload {
    
      //struct
    struct Access {
        address user;
        bool access;
    }
    //mappings
    mapping(address => string[])  value;
    mapping(address => mapping(address => bool))  ownership;
    mapping(address => Access) public accessList;
    mapping(address => bool)  accessed;
    address[]  keys;
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string calldata url) external {
        value[_user].push(url);
    }


    function isUserPresent(address _user) internal view returns (bool) { //internal
        return accessList[msg.sender].user == _user;
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true;

        if (!accessed[_user]) {
            accessed[_user] = true;
            keys.push(_user);
        }

        if (previousData[msg.sender][_user]) {
            if (isUserPresent(_user)) {
                accessList[msg.sender].access = true;
            }
        } else {
            accessList[msg.sender] = Access(_user, true);
            previousData[msg.sender][_user] = true;
        }
    }

    function disallow(address _user) external {
        ownership[msg.sender][_user] = false;
        accessList[msg.sender].access = false; // no need to check if address is in accessList(i.e been
        // given access before) that is to allow the owner to prevent access to some addresses from start.

        if(accessed[_user]) {
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

    function shareAccess() public view returns (Access memory) {
        return accessList[msg.sender];
    }
}

