import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
class ErrorBoundary extends React.Component<{children: React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?<main className="fatal"><h1>Vamos voltar ao jogo.</h1><p>Ocorreu um problema ao abrir esta página. Os dados guardados não foram apagados.</p><button className="button primary" onClick={()=>location.reload()}>Recarregar</button></main>:this.props.children;}}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);
