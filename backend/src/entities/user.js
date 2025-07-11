const EntitySchema = require('typeorm').EntitySchema

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    user_id: {
      primary: true,
      type: 'uuid',
      default: () => 'uuid_generate_v4()'
    },
    user_name: {
      type: 'varchar',
      length: 255,
      unique: true,
      nullable: false
    },
    phone_number: {
      type: 'varchar',
      length: 20,
      nullable: true
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
      nullable: false
    },
    password_hash: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    is_active: {
      type: 'boolean',
      default: false
    },
    last_activated_at: {
      type: 'timestamp',
      nullable: true
    },
    refresh_token: {
      type: 'varchar',
      length: 255,
      nullable: true
    },
    refresh_token_expires_at: {
      type: 'timestamp',
      nullable: true
    },
    created_at: {
      type: 'timestamp',
      default: () => 'NOW()'
    },
    updated_at: {
      type: 'timestamp',
      nullable: true
    }
  }
})

module.exports = User
