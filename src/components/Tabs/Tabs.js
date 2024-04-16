import React from 'react';



function Tab(props) {

  const [visibleTab, setVisibleTab] = React.useState(props.data[0].id)

  const listTitles = props.data.map((item) =>
    <li onClick={() => setVisibleTab(item.id)} style={{
      backgroundColor: visibleTab === item.id ? "#f5f5f5" : " #fff",
      display: "inline-block",
      padding: "10px",
      color: visibleTab === item.id ? "#00070a" : "#c7c6c2",
      cursor: "pointer",
      marginLeft: "1px",

    }} className={visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"}> {item.tabTitle}</li >
  )

  const listContent = props.data.map((item) =>
    <div style={visibleTab === item.id ? { minHeight: "200px" } : { display: 'none' }}>{item?.type === "html" ? <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: item?.tabContent }}></div> : item.tabContent}</div>
  )

  return (
    <div className="tabs">
      <ul className="tabs-titles" style={{
        listStyle: "none",
        padding: '0px',
        margin: 0,
      }}>
        {listTitles}
      </ul>
      <div className="tab-content" style={{
        backgroundColor: "#FFFFFF",
        padding: "5px",
        margin: 0,
      }}>
        {listContent}
      </div>
    </div >
  )
}

export { Tab }