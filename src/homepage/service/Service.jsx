import React from 'react'
import './service.css'

const Service = () => {
    const services = [
        {
          id: 1,
          icon: <i class="bi bi-1-circle-fill"></i>,
          title: 'comfort',
          text:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
        },
        {
          id: 2,
          icon: <i class="bi bi-1-circle-fill"></i>,
          title: 'Restorable',
          text:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
        },
        {
          id: 3,
          icon: <i class="bi bi-1-circle-fill"></i>,
          title: 'Durablity',
          text:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
        },
      ]
  return (
  
    <div className='section-center section-padding section-margin'>
      <article className='header'>
        <h3>
          custom furniture built only for you
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          dolorum debitis consectetur reprehenderit non aliquam voluptates
          dolore aut vero consequuntur.
        </p>
      </article>
      <div className='services-center'>
        {services.map((service) => {
          const { id, icon, title, text } = service
          return (
            <article className='service' key={id}>
              <span className='icon'>{icon}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          )
        })}
      </div>
    </div>
 
)
}





export default Service