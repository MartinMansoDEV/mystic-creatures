import {
  Model,
  FilterQuery,
  UpdateQuery,
  UpdateWriteOpResult,
  PipelineStage,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  public async create(createEntityData: object): Promise<T> {
    return new this.entityModel(createEntityData).save() as unknown as T;
  }

  public async delete(id: string): Promise<string> {
    await this.entityModel.deleteOne({ id });
    return id;
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true },
    );
  }

  async updateOne(entityFilterQuery: FilterQuery<T>, data): Promise<boolean> {
    const result: UpdateWriteOpResult = await this.entityModel
      .updateOne(entityFilterQuery, data)
      .exec();
    return result.matchedCount === 1;
  }
  async aggregate<TAggregate>(
    pipeLine: PipelineStage[],
  ): Promise<TAggregate[]> {
    return this.entityModel.aggregate<TAggregate>(pipeLine);
  }
}
