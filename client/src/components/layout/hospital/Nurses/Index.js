import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import { toast } from 'react-toastify'

import setAuthToken from '../../../../utils/setAuthToken'
import { upperCaseFirstLetter } from '../../../../utils/TypeTransform'

const Index = () => {

  const [nurses, setNurses] = useState([])

  useEffect(() => {

    if (localStorage.hospitalToken) {
      setAuthToken(localStorage.hospitalToken)
    }

    axios.get('/api/hospital/data/nurses')
      .then(res => {
        $(document).ready(function () {
          $('#doctors-table').DataTable();
        });

        setNurses(res.data.nurses)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => toast(error.msg, { type: 'error' }))
        }
      })
  }, [])
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Nurses</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Hospital</li>
                <li className="breadcrumb-item">Dashboard</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Info boxes */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title">
                    Hospital Nurses
                  </h1>
                  <div className="card-tools">
                    <Link to="/hospital/dashboard/createUser" className="btn btn-primary">
                      Create a Nurse
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <table id="doctors-table" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Hospital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        nurses.map(nurse => {
                          return (
                            <tr key={nurse._id}>
                              <td>{upperCaseFirstLetter(nurse.role.role_name)}</td>
                              <td>{nurse.name}</td>
                              <td>{nurse.username}</td>
                              <td>{nurse.hospital.name}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}

    </div >

  )
}

export default Index
