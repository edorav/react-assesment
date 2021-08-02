import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../models/User';
import userService from '../services/users.service';

type UserFormProps = {
    user?: User,
    onSave: (user: User) => void
};

enum SubmitType {
  SUCCESS,
  FAIL_ONCE,
  FAIL_TWICE
}

export default function UserForm({user, onSave}: UserFormProps) {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [submitType, setSubmitType] = useState<SubmitType>(SubmitType.SUCCESS);


  useEffect(() => {
      if (user) {
          reset({ fullname: user.fullname , username: user.username });
      }
  }, [user]);
  
  const onSubmit = (data: User) => {
      if(user?.id) {
        userService.saveUser({...user, ...data});
        onSave(data)
      } else {
        let i = -1;
        while (i < submitType) {
          i++;
          console.log('Provo a salvare', i===submitType);
          if(i === submitType) {
            try {
              userService.addUser(data);
              onSave(data);
            } catch (er) {
              alert(er);
            }
          }
          
        }
      }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="btn-group btn-group-sm mb-2" role="group" aria-label="Basic example">
        <button type="button" className={`btn ${submitType === SubmitType.SUCCESS ? 'btn-primary': 'btn-secondary'}`} onClick={_ => setSubmitType(SubmitType.SUCCESS)}>Success</button>
        <button type="button" className={`btn ${submitType === SubmitType.FAIL_ONCE ? 'btn-primary': 'btn-secondary'}`} onClick={_ => setSubmitType(SubmitType.FAIL_ONCE)}>Fail once</button>
        <button type="button" className={`btn ${submitType === SubmitType.FAIL_TWICE ? 'btn-primary': 'btn-secondary'}`} onClick={_ => setSubmitType(SubmitType.FAIL_TWICE)}>Fail twice</button>
      </div>
      <div className="form-group">
          <label htmlFor="fullname">Fullname</label>
          <input type="text" className={`form-control ${errors?.fullname ? "is-invalid" : ""}`} id="fullname" placeholder="Fullname"  {...register("fullname", {required: true, maxLength: 80})} />
      </div>
      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className={`form-control ${errors?.username ? "is-invalid" : ""}`} id="username" placeholder="Username"  {...register("username", {required: true, maxLength: 80})} />
      </div>

      <button type="submit" className="btn btn-primary mt-1">Save</button> 
    </form>
  );
}