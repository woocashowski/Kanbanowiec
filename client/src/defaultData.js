const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        label: '2/2',
        "style": {"background-color": "blue"},
        cards: [
          {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', "style": { "background-color": "yellow" }},
          {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins'}
        ]
      },
      {
        id: 'lane2',
        title: 'Completed',
        "style": {"background-color": "red"},
        label: '0/0',
        cards: []
      }
    ]
  }

  module.exports = data;