const demo = `
	<?xml version="1.0"?>
	<?mso-application progid="Excel.Sheet"?>
	<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
	 xmlns:o="urn:schemas-microsoft-com:office:office"
	 xmlns:x="urn:schemas-microsoft-com:office:excel"
	 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
	 xmlns:html="http://www.w3.org/TR/REC-html40">
	 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
	  <Author>Guzman Monne</Author>
	  <LastAuthor>Guzman Monne</LastAuthor>
	  <Created>2016-05-01T13:42:59Z</Created>
	  <LastSaved>2016-05-01T14:00:32Z</LastSaved>
	  <Version>16.00</Version>
	 </DocumentProperties>
	 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
	  <AllowPNG/>
	 </OfficeDocumentSettings>
	 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
	  <WindowHeight>7785</WindowHeight>
	  <WindowWidth>9705</WindowWidth>
	  <WindowTopX>0</WindowTopX>
	  <WindowTopY>0</WindowTopY>
	  <ProtectStructure>False</ProtectStructure>
	  <ProtectWindows>False</ProtectWindows>
	 </ExcelWorkbook>
	 <Styles>
	  <Style ss:ID="Default" ss:Name="Normal">
	   <Alignment ss:Vertical="Bottom"/>
	   <Borders/>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
	   <Interior/>
	   <NumberFormat/>
	   <Protection/>
	  </Style>
	  <Style ss:ID="s97">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#E2EFDA"
	    ss:Bold="1"/>
	   <Interior ss:Color="#70AD47" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s98">
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#E2EFDA"
	    ss:Bold="1"/>
	   <Interior ss:Color="#70AD47" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s99">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s148">
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	   </Borders>
	   <Interior/>
	  </Style>
	  <Style ss:ID="s242">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FCE4D6"/>
	   <Interior ss:Color="#C00000" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s243">
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FCE4D6"/>
	   <Interior ss:Color="#C00000" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s244">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s246">
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s248">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FCE4D6"/>
	   <Interior ss:Color="#ED7D31" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s249">
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FCE4D6"/>
	   <Interior ss:Color="#ED7D31" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s250">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s252">
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	   </Borders>
	   <Interior ss:Color="#FCE4D6" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s253">
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	   </Borders>
	   <Interior ss:Color="#FCE4D6" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s260">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#C00000" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s261">
	   <Borders>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#C00000" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s262">
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#C00000" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s263">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="9" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#808080" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s264">
	   <Borders/>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="9" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#808080" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s265">
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="9" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#808080" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s266">
	   <Borders>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s267">
	   <Borders/>
	  </Style>
	  <Style ss:ID="s271">
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s272">
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s278">
	   <Borders/>
	   <Interior/>
	  </Style>
	  <Style ss:ID="s279">
	   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
	   <Borders/>
	   <NumberFormat ss:Format="0%"/>
	  </Style>
	  <Style ss:ID="s280">
	   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
	   <Borders/>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="9" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#808080" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s281">
	   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
	   <Borders/>
	  </Style>
	  <Style ss:ID="s282">
	   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <NumberFormat ss:Format="0%"/>
	  </Style>
	  <Style ss:ID="s283">
	   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	  </Style>
	  <Style ss:ID="s291">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders/>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s292">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders/>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="9" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#808080" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s295">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s296">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="9" ss:Color="#FFFFFF"/>
	   <Interior ss:Color="#808080" ss:Pattern="Solid"/>
	  </Style>
	  <Style ss:ID="s297">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#BFBFBF"/>
	   </Borders>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s303">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#ED7D31"/>
	   </Borders>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s304">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	   </Borders>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s305">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#70AD47"/>
	   </Borders>
	   <Interior/>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s306">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	   </Borders>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	  <Style ss:ID="s307">
	   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:Indent="1"/>
	   <Borders>
	    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
	     ss:Color="#C00000"/>
	   </Borders>
	   <NumberFormat ss:Format="Standard"/>
	  </Style>
	 </Styles>
	 <Worksheet ss:Name="Sheet1">
	  <Table ss:ExpandedColumnCount="9" ss:ExpandedRowCount="23" x:FullColumns="1"
	   x:FullRows="1" ss:DefaultRowHeight="15">
	   <Column ss:Width="189"/>
	   <Column ss:Width="267.75"/>
	   <Column ss:Width="72.75"/>
	   <Column ss:Width="29.25"/>
	   <Column ss:Width="54.75"/>
	   <Column ss:Width="27.75"/>
	   <Column ss:Width="40.5"/>
	   <Column ss:Width="79.5"/>
	   <Column ss:Width="49.5"/>
	   <Row>
	    <Cell ss:StyleID="s260"><Data ss:Type="String">Numero de Parte</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Descripción</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Precio de Lista</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Cant.</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Descuento</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Intro</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Margen</Data></Cell>
	    <Cell ss:StyleID="s261"><Data ss:Type="String">Precio de Venta</Data></Cell>
	    <Cell ss:StyleID="s262"><Data ss:Type="String">Sub-Total</Data></Cell>
	   </Row>
	   <Row ss:AutoFitHeight="0" ss:Height="12.75">
	    <Cell ss:StyleID="s263"><Data ss:Type="String">Hardware</Data></Cell>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s265"/>
	   </Row>
	   <Row>
	    <Cell ss:StyleID="s266"><Data ss:Type="String">MR32-HW</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="String">Meraki MR32 Cloud Managed</Data></Cell>
	    <Cell ss:StyleID="s291"><Data ss:Type="Number">799</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="Number">1</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s291" ss:Formula="=RC[-5]*(1-RC[-3])*(1+RC[-2])/(1-RC[-1])"><Data
	      ss:Type="Number">958.80000000000007</Data></Cell>
	    <Cell ss:StyleID="s295" ss:Formula="=RC[-1]*RC[-5]"><Data ss:Type="Number">958.80000000000007</Data></Cell>
	   </Row>
	   <Row>
	    <Cell ss:StyleID="s266"><Data ss:Type="String">MS220-24-HW</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="String">Meraki MS220-24 L2 Cloud Managed 24 Port GigE Switch</Data></Cell>
	    <Cell ss:StyleID="s291"><Data ss:Type="Number">2155</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="Number">2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s291" ss:Formula="=RC[-5]*(1-RC[-3])*(1+RC[-2])/(1-RC[-1])"><Data
	      ss:Type="Number">2585.9999999999995</Data></Cell>
	    <Cell ss:StyleID="s295" ss:Formula="=RC[-1]*RC[-5]"><Data ss:Type="Number">5171.9999999999991</Data></Cell>
	   </Row>
	   <Row ss:AutoFitHeight="0" ss:Height="12.75">
	    <Cell ss:StyleID="s263"><Data ss:Type="String">Software</Data></Cell>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s292"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s280"/>
	    <Cell ss:StyleID="s280"/>
	    <Cell ss:StyleID="s280"/>
	    <Cell ss:StyleID="s292"/>
	    <Cell ss:StyleID="s296"/>
	   </Row>
	   <Row>
	    <Cell ss:StyleID="s266"><Data ss:Type="String">LIC-ENT-3YR</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="String">Meraki MR Enterprise License, 3 Years</Data></Cell>
	    <Cell ss:StyleID="s291"><Data ss:Type="Number">300</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="Number">1</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s291" ss:Formula="=RC[-5]*(1-RC[-3])*(1+RC[-2])/(1-RC[-1])"><Data
	      ss:Type="Number">300</Data></Cell>
	    <Cell ss:StyleID="s295" ss:Formula="=RC[-1]*RC[-5]"><Data ss:Type="Number">300</Data></Cell>
	   </Row>
	   <Row>
	    <Cell ss:StyleID="s266"><Data ss:Type="String">LIC-MS220-24-3YR</Data></Cell>
	    <Cell ss:StyleID="s278"><Data ss:Type="String">Meraki MS220-24 Enterprise License and Support, 3 Year</Data></Cell>
	    <Cell ss:StyleID="s291"><Data ss:Type="Number">240</Data></Cell>
	    <Cell ss:StyleID="s278"><Data ss:Type="Number">1</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s291" ss:Formula="=RC[-5]*(1-RC[-3])*(1+RC[-2])/(1-RC[-1])"><Data
	      ss:Type="Number">240</Data></Cell>
	    <Cell ss:StyleID="s295" ss:Formula="=RC[-1]*RC[-5]"><Data ss:Type="Number">240</Data></Cell>
	   </Row>
	   <Row ss:AutoFitHeight="0" ss:Height="12.75">
	    <Cell ss:StyleID="s263"><Data ss:Type="String">Administracíón, Soporte y Financiación</Data></Cell>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s292"/>
	    <Cell ss:StyleID="s264"/>
	    <Cell ss:StyleID="s280"/>
	    <Cell ss:StyleID="s280"/>
	    <Cell ss:StyleID="s280"/>
	    <Cell ss:StyleID="s292"/>
	    <Cell ss:StyleID="s296"/>
	   </Row>
	   <Row>
	    <Cell ss:StyleID="s266"><Data ss:Type="String">Servicio</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="String">Cuota mensual</Data></Cell>
	    <Cell ss:StyleID="s291"><Data ss:Type="Number">3.7</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.5</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s295" ss:Formula="=RC[-6]/(1-RC[-2])"><Data ss:Type="Number">7.4</Data></Cell>
	   </Row>
	   <Row>
	    <Cell ss:StyleID="s266"><Data ss:Type="String">Administracion</Data></Cell>
	    <Cell ss:StyleID="s267"><Data ss:Type="String">Cuota mensual</Data></Cell>
	    <Cell ss:StyleID="s291"><Data ss:Type="Number">16.920000000000002</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s279"><Data ss:Type="Number">0.5</Data></Cell>
	    <Cell ss:StyleID="s281"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s295" ss:Formula="=RC[-6]/(1-RC[-2])"><Data ss:Type="Number">33.840000000000003</Data></Cell>
	   </Row>
	   <Row ss:Height="15.75">
	    <Cell ss:StyleID="s271"><Data ss:Type="String">Financiación de Equipos</Data></Cell>
	    <Cell ss:StyleID="s272"><Data ss:Type="String">Cuota mensual bajo contrato a 36 meses</Data></Cell>
	    <Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s282"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s282"><Data ss:Type="Number">0.2</Data></Cell>
	    <Cell ss:StyleID="s283"><Data ss:Type="String">-</Data></Cell>
	    <Cell ss:StyleID="s297"><Data ss:Type="Number">47.94</Data></Cell>
	   </Row>
	   <Row ss:Height="15.75"/>
	   <Row>
	    <Cell ss:Index="2" ss:StyleID="s248"><Data ss:Type="String">Solución Unificada</Data></Cell>
	    <Cell ss:StyleID="s249"/>
	   </Row>
	   <Row>
	    <Cell ss:Index="2" ss:StyleID="s250"><Data ss:Type="String">Cuota Mensual</Data></Cell>
	    <Cell ss:StyleID="s303" ss:Formula="=SUM(R[-5]C[6]:R[-3]C[6])"><Data
	      ss:Type="Number">89.18</Data></Cell>
	   </Row>
	   <Row ss:Height="15.75">
	    <Cell ss:Index="2" ss:StyleID="s252"><Data ss:Type="String">OBS: Contrato a 36 meses obligatorio.</Data></Cell>
	    <Cell ss:StyleID="s253"/>
	   </Row>
	   <Row ss:Height="15.75"/>
	   <Row>
	    <Cell ss:Index="2" ss:StyleID="s97"><Data ss:Type="String">Soulción Administrada</Data></Cell>
	    <Cell ss:StyleID="s98"/>
	   </Row>
	   <Row>
	    <Cell ss:Index="2" ss:StyleID="s99"><Data ss:Type="String">Inversión Inicial</Data></Cell>
	    <Cell ss:StyleID="s304" ss:Formula="=SUM(R[-15]C[6])"><Data ss:Type="Number">958.80000000000007</Data></Cell>
	   </Row>
	   <Row ss:Height="15.75">
	    <Cell ss:Index="2" ss:StyleID="s148"><Data ss:Type="String">Cuota mensual</Data></Cell>
	    <Cell ss:StyleID="s305"
	     ss:Formula="=R[-10]C[6]+R[-9]C[6]+SUM(R[-13]C[6]:R[-12]C[6])/36"><Data
	      ss:Type="Number">56.24</Data></Cell>
	   </Row>
	   <Row ss:Height="15.75"/>
	   <Row>
	    <Cell ss:Index="2" ss:StyleID="s242"><Data ss:Type="String">Solución Tradicional</Data></Cell>
	    <Cell ss:StyleID="s243"/>
	   </Row>
	   <Row>
	    <Cell ss:Index="2" ss:StyleID="s244"><Data ss:Type="String">Inversión Inicial</Data></Cell>
	    <Cell ss:StyleID="s306" ss:Formula="=SUM(R[-19]C[6])"><Data ss:Type="Number">958.80000000000007</Data></Cell>
	   </Row>
	   <Row ss:Height="15.75">
	    <Cell ss:Index="2" ss:StyleID="s246"><Data ss:Type="String">Cuota mensual</Data></Cell>
	    <Cell ss:StyleID="s307" ss:Formula="=R[-14]C[6]+SUM(R[-17]C[6]:R[-16]C[6])/36"><Data
	      ss:Type="Number">22.4</Data></Cell>
	   </Row>
	  </Table>
	  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
	   <PageSetup>
	    <Header x:Margin="0.3"/>
	    <Footer x:Margin="0.3"/>
	    <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
	   </PageSetup>
	   <Print>
	    <ValidPrinterInfo/>
	    <HorizontalResolution>600</HorizontalResolution>
	    <VerticalResolution>600</VerticalResolution>
	   </Print>
	   <Selected/>
	   <Panes>
	    <Pane>
	     <Number>3</Number>
	     <ActiveRow>17</ActiveRow>
	     <ActiveCol>7</ActiveCol>
	    </Pane>
	   </Panes>
	   <ProtectObjects>False</ProtectObjects>
	   <ProtectScenarios>False</ProtectScenarios>
	  </WorksheetOptions>
	 </Worksheet>
	</Workbook>
`

export default demo