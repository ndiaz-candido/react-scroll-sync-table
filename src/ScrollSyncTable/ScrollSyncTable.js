import React, { PureComponent } from 'react';
import ScrollSyncBody from './ScrollSyncBody';
import ScrollSyncColumns from './ScrollSyncColumns';
import ScrollSyncRows from './ScrollSyncRows';
import './ScrollSyncTable.css';

class ScrollSyncTable extends PureComponent {
  getColumns = () => {
    const columns = this.props.children.find((child) => (child.type === ScrollSyncColumns));

    return columns.props.children || [];
  };

  getRows = () => {
    const rows = this.props.children.find((child) => (child.type === ScrollSyncRows));

    return rows.props.children || [];
  };

  extractRowsAndColumns = () => {
    if (React.Children.count(this.props.children) !== 2) {
      console.warn('ScrollSyncTable: Two children expected, ScrollSyncColumns and ScrollSyncRows');

      return { columns: [], rows: [] };
    }

    return {
      columns: this.getColumns(),
      rows: this.getRows()
    };
  };

  render() {
    const { stickHeader } = this.props;

    return (
      <div className="scrollSyncTable">
        <ScrollSyncBody stickHeader={stickHeader} {...this.extractRowsAndColumns()} />
      </div>
    );
  }
}

ScrollSyncTable.defaultProps = {
  columns: [],
  rows: [],
  stickHeader: false
};

export default ScrollSyncTable;