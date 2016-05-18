import React from 'react'
import {
	Grid,
	Col,
	Row,
	Panel
} from 'react-bootstrap'

const ActivateAccountContainer = ({verifying}) =>
	<div style={{marginTop: '100px'}}>
		<Grid>
			<Row>
				<Col md={6} mdOffset={3}>
					{!!verifying ? 
						<div className="text-center">
							<h1 className="text-center">Verificando cuenta...</h1>
						</div>
						:
						<div className="text-center">
							<h1 text-center>
								Cuenta Activada
								<br/>
								<small>¡Bienvenido a ConApps!</small>
							</h1>
							Haga <a href="https://www.conapps.click/login">click aqui</a> para comenzar a utilizar la herramienta.
						</div>
					}
				</Col>
			</Row>
		</Grid>
	</div>

ActivateAccountContainer.propTypes = {
	verifying: React.PropTypes.bool
}

export default ActivateAccountContainer