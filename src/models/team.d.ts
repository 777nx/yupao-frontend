/**
 * 组队类别
 */
export type teamType ={
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    // todo 定义枚举值类型，更规范
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
}