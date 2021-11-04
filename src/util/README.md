### util/IndexedDB 篇
#### 简介
> 由于项目需求，需要本地维护大量数据，并支持索引检索，所以选用的H5的新特性IndexedDB做数据存储。不过IndexedDB的API较为复杂，配置代码居多，直接使用会产生大量冗余代码，所以基于IndexedDB的原生API二次封装了一层，方便业务代码的编写。 util/IndexedDB.js 封装了常用的几个功能：数据库及表格初始化配置，创建事务，新建，根据条件查询所有数据，根据条件查询指定数据，修改指定数据。

#### 初始化
```javascript
// @param dbName  数据库名
// @param tableName  表名
// @param onupgradeneeded  表初始化回调函数，用于建表、建立索引和指定键索引keyPath
featuresStore = new IndexedDB('demo', 'features', db => {
    let objectStore = db.createObjectStore('features', { keyPath: 'id' }); //创建features表，keyPath为id
    objectStore.createIndex('name', 'name', { unique: false }); //设置name为索引，不唯一
});
```

### 根据条件查询所有数据
```javascript
featuresStore.getAll()  //查询所有数据，返回Promise，成功返回对象数组
featuresStore.getAll(10) //查询所有keyPath为10的数据，返回Promise，成功返回对象数组
featuresStore.getAll(10, 'indexName') //查询所有indexName为10的数据，返回Promise，成功返回对象数组（indexName必须为索引名称）
```

### 根据条件查询指定数据
```javascript
featuresStore.get(10) //查询keyPath为10的数据，返回Promise，成功返回对象
featuresStore.get(10, 'indexName') //查询indexName为10的数据，返回Promise，成功返回对象数组（indexName必须为索引名称）
```

### 新建数据
```javascript
featuresStore.add({id: 0, name: 'xx'}) //新增一条数据，必须有<keyPath>属性
```

### 修改数据
```javascript
featuresStore.edit({id: 0, name: 'ss'}) //修改id为10的记录，修改为{id: 0, name: 'ss'}
```