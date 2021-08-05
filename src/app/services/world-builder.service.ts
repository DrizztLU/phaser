import { Injectable } from "@angular/core";
import { WorldGrid, WorldModel } from "../models/world.model";
import { WorldBuilderTypeEnum } from "./world-builder-type.enum";

export class WorldBuilderService {

    private defaultMapSize:number = 2000;
    private defaultTilesetVariationCount:number = 3;

    constructor(){

    }

    public GenerateWorld(type: WorldBuilderTypeEnum){
        

        if(type == WorldBuilderTypeEnum.Wilderness){
            return this.GenerateWilderness();
        }
        else {
            return this.GenerateWilderness();
        }
    }

    private GenerateWilderness(): WorldModel{
        let world = new WorldModel();

        world.tileset = "grass";
        world.masterGrid = new WorldGrid();

        world.masterGrid.tilesetVariation = -1;

        let masterGridData = [];

        for (let x = 0; x < this.defaultMapSize; x++) {
            masterGridData[x] = new Array<number>();
            for (let y = 0; y < this.defaultMapSize; y++) {
                masterGridData[x][y] = Math.floor(Math.random()*10%this.defaultTilesetVariationCount);
            }
        }

        world.masterGrid.data = masterGridData;

        return world;
    }

}