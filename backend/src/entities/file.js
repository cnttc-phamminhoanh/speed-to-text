const EntitySchema = require('typeorm').EntitySchema

const File = new EntitySchema({
  name: 'File',
  tableName: 'files',
  columns: {
    file_id: {
      type: 'uuid',
      primary: true,
      default: () => 'uuid_generate_v4()'
    },
    user_id: {
      type: 'uuid',
      nullable: false
    },
    original_name: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    storage_path: {
      type: 'varchar',
      length: 512,
      nullable: false
    },
    mime_type: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    duration: {
      type: 'int',
      nullable: true
    },
    size: {
      type: 'int',
      nullable: true
    },
    status: {
      type: 'enum',
      enum: ['uploaded', 'processing', 'completed', 'failed', 'cancelled'],
      default: 'uploaded'
    },
    created_at: {
      type: 'timestamp',
      default: () => 'NOW()'
    }
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'user_id'
      },
      onDelete: 'CASCADE'
    }
  }
})

module.exports = File
