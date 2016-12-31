
  const readline = require('readline');

  const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout
  });

  function output(output){
    console.log(output);
  }

  let current_room = 'start';
  let inventory = [];
  const items = require('./items.js');
  const rooms = require('./rooms.js');

  const userOps = {
    directions : ['north', 'south', 'east', 'west', 'up', 'down', 'enter', 'exit'],
    actions    : ['inventory', 'look','examine','get','drop','use'],
    move : function(direction){
      if(rooms[current_room].exits.hasOwnProperty(direction)){
        current_room = rooms[current_room].exits[direction];
        loadRoom();
      } else {
        output("You can't go that way.");
      }
    },
    inventory : function(){
      output('You have:');
      output(inventory.join("\n"));
    },
    look : function(){
      loadRoom();
    },
    examine : function(item){
      if(inventory.includes(item) || rooms[current_room].items.includes(item)){
        output(items[item]);
      } else if(rooms[current_room].fixtures.hasOwnProperty(item)){
        output(rooms[current_room].fixtures[item]);
      } else {
        output("You can't see that item.");
      }
    },
    get : function(item){
      if(rooms[current_room].items.includes(item)){
        inventory.push(item); // Add to inventory
        rooms[current_room].items.splice(rooms[current_room].items.indexOf(item), 1); // Remove from room
        output('You picked up the '+ item);
      } else {
        output("That item doesn't appear to be here.");
      }
    },
    drop : function(item){
      if(inventory.includes(item)){
        rooms[current_room].items.push(item); // Add to room
        inventory.splice(inventory.indexOf(item), 1); // Remove from inventory
        output('You dropped the '+ item);
      } else {
        output("You don't have that.");
      }
    },
    use : function(item){
      if(inventory.includes(item) || rooms[current_room].items.includes(item)){
        output(items[item]);
      } else if(rooms[current_room].fixtures.hasOwnProperty(item)){
        output(rooms[current_room].fixtures[item]);
      } else {
        output("You can't see that item.");
      }
    }
  };

  function loadRoom(){
    output("\n"+'### '+ rooms[current_room].title +' ###');
    output(rooms[current_room].description);
    if(rooms[current_room].items.length > 0){
      output("You can see "+ rooms[current_room].items.join(', '));
    }
  }

  function start(){
    loadRoom();
    rl.prompt();
  }

  function processInput(cmd, next){
    if(cmd == 'exit'){ rl.close(); process.exit(); }
    let cmds = cmd.split(" "); // output(cmds);
    if(userOps.directions.includes(cmds[0])){
      userOps.move(cmds[0]);
    } else if(userOps.actions.includes(cmds[0])){
      userOps[cmds[0]](cmds[1]);
    } else {
      output('Beg pardon?!');
    }
    next();
  }

  rl.on('line', (input) => {
    processInput(input.toLowerCase(), () => {
      rl.prompt();
    });
  });

  start();
