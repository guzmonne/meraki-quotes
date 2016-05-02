import moment from 'moment'

const MerakiQuoteXMLHeader = ({Name, createdAt}) => `
	 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
	  <Author>${Name || 'Guzmán Monné'}</Author>
	  <LastAuthor>${Name || 'Guzmán Monné'}</LastAuthor>
	  <Created>${createdAt || moment(new Date()).format('YYYY-MM-DDThh:mm:ssZ')}</Created>
	  <LastSaved>${moment(new Date()).format('YYYY-MM-DDThh:mm:ssZ')}</LastSaved>
	  <Version>16.00</Version>
	 </DocumentProperties>
	 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
	  <AllowPNG/>
	 </OfficeDocumentSettings>
	 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
	  <WindowHeight>11370</WindowHeight>
  	<WindowWidth>19200</WindowWidth>
	  <WindowTopX>0</WindowTopX>
	  <WindowTopY>0</WindowTopY>
	  <ProtectStructure>False</ProtectStructure>
	  <ProtectWindows>False</ProtectWindows>
	 </ExcelWorkbook>
`

export default MerakiQuoteXMLHeader