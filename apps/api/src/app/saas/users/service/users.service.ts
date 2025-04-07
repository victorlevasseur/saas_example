import { Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserDto } from '../dto/user-dto';
import { FAKE_PASSWORD } from '../../../core/auth.module';
import { err, ok, Result } from 'neverthrow';
import { CreateUserError, CreateUserExistingError } from '../error/create-user-error';
import { FindUserError, FindUserNotFoundByEmailError, FindUserNotFoundByIdError } from '../error/find-user-error';

@Injectable()
export class UsersService {
  async createUser(data: CreateUserDto): Promise<Result<UserDto, CreateUserError>> {
    const creation = await EmailPassword.signUp('public', data.email, FAKE_PASSWORD);
    if (creation.status === 'EMAIL_ALREADY_EXISTS_ERROR') {
      return err(new CreateUserExistingError(data.email))
    }

    await EmailPassword.sendResetPasswordEmail(
      'public',
      creation.user.id,
      data.email,
    );

    return ok({
      id: creation.user.id,
      email: creation.user.emails[0]
    });
  }

  async findUserById(id: string): Promise<Result<UserDto, FindUserError>> {
    const user = await supertokens.getUser(id);
    if (!user) {
      return err(new FindUserNotFoundByIdError(id));
    }

    // TODO: improve logic to properly work in case of multiple emails...
    return ok({
      id: user.id,
      email: user.emails[0]
    });
  }

  async findUserByEmail(email: string): Promise<Result<UserDto, FindUserError>> {
    const users = await supertokens.listUsersByAccountInfo('public', {
      email
    });

    if (users.length === 0) {
      return err(new FindUserNotFoundByEmailError(email));
    }

    // TODO: improve logic to properly work in case of multiple emails, users...
    return ok({
      id: users[0].id,
      email: users[0].emails[0]
    });
  }
}
