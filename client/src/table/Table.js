import React from 'react';
import Board from 'react-trello'
import Api from './../api/api';
import User from './../user/user';
function Table() {
  const [data, setData] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function DoStuff() {
      let user = User.Get();
      console.log(user);
      Api.GetTable(user.email, user.token).then((d) => {
        setData(d.response.data);
        setLoaded(true);
      }).catch(
        () => setError(true)
      )

    }
    DoStuff();
  }, [setData, setLoaded,setError]);
  function HandleDataChange(newData) {
    let user = User.Get();
    Api.UpdateTable(user.email, user.token, newData);
  }
  console.log(data);
  if(error) {
    return <div>error loading!</div>;
  }
  if(!loaded) {
    return <div>Loading...</div>;
  }
  return <Board editable
    editLaneTitle
    data={data}

    onDataChange={HandleDataChange}
  />;
}

export default Table;