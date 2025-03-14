import hbs from 'handlebars-extd';
import {components} from 'metronic-extension';
import Datatable from '~/shared/Datatable';
import reloadDataTableWithDelay from '~/shared/reloadDataTableWithDelay';
import UserApi from '~/api/UserApi';
import UserModal from '~/modals/UserModal';
import '~/users.css';

/**
 * Initializes the data table.
 */
const initDatatable = () => {
  let targetIndex = 0;
  userTable = new Datatable(ref.userTable, {
    ajax: {
      url: '/api/users',
      data: d => {
        // Set filter parameters.
        d.search = ref.keyword.val()
      }
    },
    dom: `<'row'<'col-12 dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: targetIndex++, data: 'name', className: 'd-flex align-items-center', render: (data, type, row) => hbs.compile(
        `<div class="symbol symbol-35px me-3">
          <img src="{{row.icon}}?{{formatDate 'x' row.modified}}">
        </div>
        <span class="text-gray-800">{{row.name}}</span>`)({row})
      },
      {targets: targetIndex++, data: 'email'},
      {targets: targetIndex++, data: 'modified', render: data => hbs.compile(`{{formatDate 'YYYY/M/D HH:mm:ss' data}}`)({data})},
      {targets: targetIndex++, className: 'text-end', data: 'actions', orderable: false, render: (data, type, row) =>
        hbs.compile(
          `<button data-on-update-user data-id="{{row.id}}" data-bs-toggle="tooltip" data-bs-dismiss="click" title="Update user." type="button" class="btn btn-sm btn-icon btn-light btn-icon-gray-800 btn-active-light-primary me-3">
            <!--begin::Svg Icon | path: icons/duotune/general/gen019.svg-->
            <span class="svg-icon svg-icon-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor" />
                <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor" />
              </svg>
            </span>
            <!--end::Svg Icon-->
          </button>
          {{#if (neq row.role 'workgroup_owner')}}
            <button data-on-delete-user data-id="{{row.id}}" data-bs-toggle="tooltip" data-bs-dismiss="click" title="Delete a user." type="button" class="btn btn-sm btn-icon btn-light btn-icon-gray-800 btn-active-light-primary">
              <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
              <span class="svg-icon svg-icon-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />
                  <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />
                  <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />
                </svg>
              </span>
              <!--end::Svg Icon-->
            </button>
          {{/if}}`)({row})
      }
    ],
    order: [
      [0, 'asc'],
    ]
  });
}

/**
 * Handles form events.
 */
const handleForm = () => {
  $('body')
    .on('click', '[data-on-create-user]', async () => {
      if (await userModal.show('create') !== false)
        userTable.reload();
    })
    .on('click', '[data-on-update-user]', async evnt => {
      const userId = evnt.currentTarget.closest('tr').dataset.id;
      if (await userModal.show('update', userId) !== false)
        userTable.reload();
    })
    .on('click', '[data-on-delete-user]', async evnt => {
      try {
        const tr = evnt.currentTarget.closest('tr');
        const {name} = userTable.getRowData(tr);
        if (!(await components.Dialog.confirm(`Do you want to delete ${name}?`, {
          icon: 'warning',
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Delete a user',
          customClass: {
            confirmButton: 'btn fw-bolder btn-warning',
          }
        })))
          return;
        const {data} = await userApi.deleteUser(evnt.currentTarget.dataset.id);
        if (data.error)
          if (data.error === 'userNotFound') {
            await components.Dialog.warning('The user has already been deleted.');
            return void userTable.reload();
          } else
            throw Error('Unknown error');
        components.Toast.success(`${name} was deleted.`);
        userTable.reload();
      } catch (error) {
        components.Dialog.unknownError();
        throw error;
      }
    })
    .on('input', '[data-on-search-change]' , reloadDataTableWithDelay(userTable));
}

// API client.
const userApi = new UserApi();
const userModal = new UserModal();

// Get references to elements with data-ref attributes.
const ref = components.selectRef('#kt_app_content_container');
let userTable;

// Initialize the data table.
initDatatable();

// Handles form events.
handleForm();