import React from 'react';
import {
  Button,
  Icon,
} from '@material-ui/core';

import { downloadPDF } from 'reporting/store/actions';

const PdfButton = () => (
  <div data-html2canvas-ignore="true">
    <div id="my_mm" style={{ height: '1mm', width: 0 }} />
    <Button
      size="small"
      className="hide-print"
      onClick={downloadPDF}
    >
      <Icon>cloud_download</Icon>
      &nbsp;Export to PDF
    </Button>
    &nbsp;
  </div>
);

export default PdfButton;
