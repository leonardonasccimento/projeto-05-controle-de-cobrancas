import './styles.css'

export function OuverdueCharges() {
    return (
        <div className='content-ouverdue-card'>
            <div className='header-card'>
                <h3>Cobranças Vencidas</h3>
                <h4>NUM</h4>
            </div>
            <div className='content-card'>
                <div className='table-title'>
                    <p>Clientes</p>
                    <p>ID da cob.</p>
                    <p>Valor</p>
                </div>
                <div className='content-table'>
                    <span>NOME</span>
                    <span>ID</span>
                    <span>VALOR</span>
                </div>
            </div>
            <div>
                <a href='#' className=''>Ver todos</a>
            </div>
        </div>
    )

};

export default OuverdueCharges;