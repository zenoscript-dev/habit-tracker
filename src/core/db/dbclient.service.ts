import { Injectable } from '@nestjs/common';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class DBClient {
  constructor(private moduleRef: ModuleRef) {}

  public async getEntityManager(namespace: string): Promise<EntityManager> {
    const entityManager = this.moduleRef.get(
      getEntityManagerToken(`database-${namespace}`),
      {
        strict: false,
      },
    );

    return entityManager;
  }
}
