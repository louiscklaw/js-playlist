import logo from './logo.svg';
import { supabase } from './lib/api';

import './App.css';

function App() {
  let helloworld_content = {
    task: 'hello task',
    user_id: '23971ee2-80bc-4944-a000-440028cb057d',
    json_test: { hello: 'anotherworld' },
    bool_test: true,
    date_test: '2021-12-24',
    time_test: '12:23:56',
    date_and_time_tz: '2021-12-17T07:13:11+10:00',
  };
  const createHellworld = async () => {
    let add_result = await supabase.from('todos').insert(helloworld_content).single();
    console.log('createHellworld', { add_result });
  };

  const selectHelloworld = async () => {
    let select_result = await supabase
      .from('todos')
      .select('*')
      .eq('task', 'hello task')
      .order('id', { ascending: false });
    console.log('selectHelloworld', { select_result });
  };

  const selectJsonParamsStringHelloworld = async () => {
    let select_result = await supabase
      .from('todos')
      .select('*')
      .eq('json_test->>"hello"', '12345')
      .order('id', { ascending: false });
    console.log('selectHelloworld', { select_result });
  };

  const selectJsonParamsIntHelloworld = async () => {
    let select_result = await supabase
      .from('todos')
      .select('*')
      .eq('json_test->>"hello"', 67890)
      .order('id', { ascending: false });
    console.log('selectHelloworld', { select_result });
  };

  const readHelloworld = async () => {
    let read_result = await supabase.from('todos').select('*').order('id', { ascending: false });
    console.log('readHelloworld', { read_result });
  };

  const updateHelloworld = async () => {
    const update_result = await supabase.from('todos').update({ task: 'Middle Earth' }).match({ id: 8 });
    console.log('updateHelloworld', { update_result });
  };

  const deleteHelloworld = async () => {
    let delete_result = await supabase.from('todos').delete().eq('id', 9);
    console.log('deleteHelloworld', { delete_result });
  };

  return (
    <div className="App">
      <div>Helloworld supabase CRUD</div>
      <div>
        <div>create</div>
        <div>
          <button onClick={createHellworld}>createHellworld</button>
        </div>
      </div>
      <div>
        <div>read</div>
        <div>
          <button onClick={readHelloworld}>readHelloworld</button>
        </div>
      </div>
      <div>
        <div>select</div>
        <div>
          <button onClick={selectHelloworld}>selectHelloworld</button>
        </div>
      </div>
      <div>
        <div>selectJsonParamsIntHelloworld</div>
        <div>
          <button onClick={selectJsonParamsIntHelloworld}>selectJsonParamsIntHelloworld</button>
        </div>
      </div>
      <div>
        <div>selectJsonParamsStringHelloworld</div>
        <div>
          <button onClick={selectJsonParamsStringHelloworld}>selectJsonParamsStringHelloworld</button>
        </div>
      </div>
      <div>
        <div>update</div>
        <button onClick={updateHelloworld}>updateHelloworld</button>
      </div>
      <div>
        <div>delete</div>
        <button onClick={deleteHelloworld}>deleteHelloworld</button>
      </div>
    </div>
  );
}

export default App;
