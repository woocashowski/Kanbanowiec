const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Todo',
        label: '2/2',
        style: {backgroundColor: "lightblue"},
        cards: [
          {id: 'Card1', title: 'Buy milk.', description: 'Do it now.', label: '30 mins', style: { backgroundColor: "yellow" }},
          {id: 'Card2', title: 'Dont know', description: 'I am bored.', label: '5 mins'}
        ]
      },
      {
        id: 'lane2',
        title: 'In Progress',
        "style": {backgroundColor: "lightgreen"},
        label: '0/0',
        cards: []
      },
      {
        id: 'lane3',
        title: 'Done',
        style: {backgroundColor: "gray"},
        label: '0/0',
        cards: []
      }
    ]
  }

export default data;