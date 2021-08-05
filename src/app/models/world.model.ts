export class WorldModel {
    public tileset!: string;
    public masterGrid!: WorldGrid;

    public getGrid():number[][] {
        return this.masterGrid.data;
    }
}

export class WorldGrid {
    public tilesetVariation!: number;
    public data!: number [][] // Allow subgrid afterward


}