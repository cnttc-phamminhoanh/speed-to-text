const EntitySchema = require('typeorm').EntitySchema

const ConversionJob = new EntitySchema({
  name: 'ConversionJob',
  tableName: 'conversion_jobs',
  columns: {
    conversion_job_id: {
      primary: true,
      type: 'uuid',
      default: () => 'uuid_generate_v4()'
    },
    file_id: {
      type: 'uuid',
      nullable: false
    },
    status: {
      type: 'enum',
      enum: ['pending', 'processing', 'completed', 'failed', 'timeout'],
      default: 'pending'
    },
    text_result: {
      type: 'text',
      nullable: true
    },
    error_message: {
      type: 'text',
      nullable: true
    },
    started_at: {
      type: 'timestamp',
      nullable: true
    },
    completed_at: {
      type: 'timestamp',
      nullable: true
    }
  },
  relations: {
    file: {
      target: 'File',
      type: 'many-to-one',
      joinColumn: {
        name: 'file_id',
        referencedColumnName: 'file_id'
      },
      onDelete: 'CASCADE'
    }
  }
})

module.exports = ConversionJob
