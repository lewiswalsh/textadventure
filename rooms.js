
  module.exports = {
    'start' : {
      title       : 'The Clearing',
      description : "You are standing in a clearing. On the ground is an old wooden sign. To the north is a cave entrance.",
      items       : [],
      fixtures    : {
        'sign' : 'Abandon hope all ye who enter here.'
      },
      exits : {
        'north' : 'cavestart'
      }
    },
    'cavestart' : {
      title       : 'Cave Entrance',
      description : "You are just inside the entrance to a cave. There seems to be a well with a ladder goin down in to it.",
      items       : ['lamp'],
      fixtures    : {},
      exits : {
        'down'  : 'well',
        'south' : 'start'
      }
    }
  };
