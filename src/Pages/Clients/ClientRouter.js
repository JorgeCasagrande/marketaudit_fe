import ClientProvider from '../../context/clients/ClientProvider';
import ClientPage from './ClientPage';

const ClientRouter = (props) => {
  return (
    <ClientProvider>
      <ClientPage />
    </ClientProvider>
  )
};

export default ClientRouter;
