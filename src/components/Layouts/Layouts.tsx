import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Footers from '../footer/Footers';
import Headers from '../header/Headers';
const { Content } = Layout;

export default function Layouts() {
  return (
    <Layout>
      <Headers />
      <Content style={{ padding: '0 50px 30px 50px', background: '#fff', minHeight: 'calc(100vh - 30px)' }}>
        <Outlet />
      </Content>
      <Footers />
    </Layout>
  );
}
