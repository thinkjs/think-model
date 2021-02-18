
declare namespace ThinkModel {

  interface Model {
    new(modelName?: string, config?: object): Model;
    readonly HAS_MANY: number;
    readonly HAS_ONE: number;
    readonly BELONG_TO: number;
    readonly MANY_TO_MANY: number;
    /**
     * get or set db
     */
    db(db?: any): any;
    /**
     * get or set all store models
     */
    models: object;
    /**
     * get table prefix
     */
    readonly tablePrefix: string;
    /**
     * get table name, with table prefix
     */
    readonly tableName: string;
    /**
     * get primary key
     */
    readonly pk: string;
    /**
     * get last sql
     */
    readonly lastSql: string;
    /**
     * get model instance
     */
    model(name: string): Model;
    /**
     * set cache options
     */
    cache(key?: string, config?: object): Model;
    /**
     * set limit options
     */
    limit(offset?: Array<string | number> | number | string, length?: number | string): Model;
    /**
     * set page options
     */
    page(page?: Array<string | number> | number | string, listRows?: string | number): Model;
    /**
     * set where options
     * @return {} []
     */
    where(where?: string | object): Model;
    /**
     * set field options
     */
    field(field?: string, reverse?: boolean): Model;
    /**
     * set field reverse
     */
    fieldReverse(field?: string): Model;
    /**
     * set table name
     */
    table(table?: string, hasPrefix?: boolean): Model;
    /**
     * union options
     */
    union(union?: string, all?: boolean): Model;
    /**
     * join
     */
    join(join?: string | Array<string> | object): Model;
    /**
     * set order options
     */
    order(value: string): Model;
    /**
     * set table alias
     */
    alias(value: string): Model;
    /**
     * set having options
     */
    having(value: string): Model;
    /**
     * set group options
     */
    group(value: string): Model;
    /**
     * set lock options
     */
    lock(value: boolean): Model;
    /**
     * set auto options
     */
    auto(value: string): Model;
    /**
     * set distinct options
     */
    distinct(data: any): Model;
    /**
     * set explain
     */
    explain(explain: string): Model;

    /**
     * parse options, reset this.options to {}
     * @param {Object} options
     */
    parseOptions(options: any): Promise<any>;
    /**
     * Pre-operation of add
     */
    beforeAdd(data: object, options?: object): any
    /**
     * Follow-up operation of add
     */
    afterAdd(data: object, options?: object): Promise<any>
    /**
     * Follow-up operation of delete.
     */
    afterDelete(options: object): Promise<any>
    /**
     * Pre-operation of update
     */
    beforeUpdate(data: object, options?: object): any
    /**
     * Post operation of update
     */
    afterUpdate(data: object, options?: object): Promise<any>
    /**
     * Follow-up operation of find query
     */
    afterFind(data: object, options?: object): Promise<any>
    /**
     * Follow-up operation of select query
     */
    afterSelect(data: Array<object>, options?: object): Promise<any>
    /**
     * add data
     */
    add(data: object, options?: object, replace?: boolean): Promise<number>;

    /**
     * add data when not exist
     * @return {}            []
     */
    thenAdd(data: object, where?: object | string): Promise<object>;

    /**
     * update data when exist, otherwise add data
     * @return {id}
     */
    thenUpdate(data: object, where?: object | string): Promise<object>;

    /**
     * add multi data
     */
    addMany(data: Array<object>, options?: object, replace?: boolean): Promise<Array<number>>;

    /**
     * delete data
     */
    delete(options?: object): Promise<number>;

    /**
     * update data
     */
    update(data: object, options?: object): Promise<number>;

    /**
     * update all data
     */
    updateMany(dataList: Array<object>, options?: object): Promise<any>;
    /**
     * find data
     */
    find(options?: object): Promise<any>;
    /**
     * select
     */
    select(options?: object): Promise<any>;
    /**
     * select add
     */
    selectAdd(options?: object): Promise<any>;
    /**
     * count select
     */
    countSelect(options?: object, pageFlag?: boolean): Promise<Object>;
    /**
     * get field data
     * if num is ture mean get one value
     */
    getField(field: string, num?: boolean | number): Promise<object>;
    /**
     * increment field data
     */
    increment(field: string, step?: number): Promise<any>;

    /**
     * decrement field data
     * @return {} []
     */
    decrement(field: string, step?: number): Promise<any>;

    /**
     * get count
     */
    count(field: string): Promise<number>;
    /**
     * get sum
     */
    sum(field: string): Promise<number>;
    /**
     * get min value
     */
    min(field: string): Promise<number>;
    /**
     * get max valud
     */
    max(field: string): Promise<number>;
    /**
     * get value average
     */
    avg(field: string): Promise<number>;
    /**
     * query
     */
    query(sqlOptions: object | string): Promise<any>;
    /**
     * execute sql
     */
    execute(sqlOptions: object): Promise<any>;
    /**
     * parse sql
     */
    parseSql(sqlOptions: object, ...args: Array<any>): object

    /**
     * false means disable all, true means enable all
     */
    setRelation(value: boolean): Model;
    /**
     * set relation
     */
    setRelation(name: string, value?: boolean): Model;
    /**
     * start transaction
     */
    startTrans(): Promise<any>;
    /**
     * commit transcation
     */
    commit(): Promise<any>;
    /**
     * rollback transaction
     */
    rollback(): Promise<any>;
    /**
     * transaction exec functions
     * @param  {Function} fn [async exec function]
     */
    transaction(fn: Function): Promise<any>;
  }

  interface ModelThinkExtend {
    Model: Model;
  }

  interface ModelExtend {
    model(name: string, config?: any, module?: string): ThinkModel.Model;
  }
}

declare module 'thinkjs' {
  interface Think extends ThinkModel.ModelExtend, ThinkModel.ModelThinkExtend { }
  interface Controller extends ThinkModel.ModelExtend { }
  interface Context extends ThinkModel.ModelExtend { }
  interface Service extends ThinkModel.ModelExtend { }
}


declare interface ThinkModelSpace {
  think: ThinkModel.ModelExtend & ThinkModel.ModelThinkExtend
  controller: ThinkModel.ModelExtend;
  context: ThinkModel.ModelExtend;
  service: ThinkModel.ModelExtend;
}

declare function model(app: object): ThinkModelSpace;
export = model
