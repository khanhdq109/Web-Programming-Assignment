import React from 'react';
import MainGuest from './pages/guest/main';
import { Header } from './pages/admin/Header/Header';
import { Dashboard } from './pages/admin/Dashboard/Dashboard';


function App() {
    return (
        <div className="App">
          {/* Sau này chỗ này cần tạo router và layout để quản lý việc chuyển trang */}
          {/* <Header/>
          <main>
            <Homepage />
          </main> */}
          <Header />
          <MainGuest />
        </div>
      );
    }    

export default App;
