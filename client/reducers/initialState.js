export const InitialState = {
  success: false,
  error: '',
  displayLoader: 'hide-element',
  userCreated: false,
  createUserError: '',
  shouldRedirect: false,
  userData: {},
  users: {},
  adminUser: false,
  selectedUserData: {},
  displayFeedBack: 'none',
  feedBack: 'Oops!!! An error occured.',
  feedBackColor: '#dd0404',
  editPreLoader: true,
  editFormState: true,
  docs: [],
  sharedDocs: {
    doc: []
  },
  viewDoc: {
    title: '',
    content: '',
    access: '',
    creator: ''
  },
  docSuccess: false,
  editUserData: {
    firstname: '',
    lastname: ''
  },
  editDocumentData: {
    title: '',
    content: '',
    access: []
  },
  Deleted: false,
  deleteDoc: {
    title: '',
    content: '',
    access: []
  },
  deleteUser: {
    username: '',
    id: 0
  },
  editSuccess: false,
  search: [],
  lazyLoading: false,
  fullOwnedDoc: false,
  redirect: false,
  header: 'MY DOCUMENTS',
  roles: [],
  refreshed: true,
  updateSearch: false,
  searchTerm: ''
};
