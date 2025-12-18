/**
 * File upload configuration interface using Multer.
 */
export default {
  /**
   * Enable file upload middleware, defaults to disabled (false).
   * @type {boolean}
   * @example
   * ```js
   * // Enable file upload middleware
   * enabled: true,
   *
   * // Disable file upload middleware
   * enabled: false,
   * ```
   */
  enabled: false,

  /**
   * Hook function to dynamically resolve multer middleware based on request.
   * Return a multer middleware instance or null to skip upload handling for the request.
   * @type {(req: express.Request, multer: typeof import('multer')) => Function|null}
   * @example
   * ```js
   * // Single file upload
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/user/avatar' && req.method === 'POST') {
   *     const upload = multer({ storage: multer.memoryStorage() });
   *     return upload.single('avatar');
   *   }
   *   return null;
   * },
   * ```
   * @example
   * ```js
   * // Multiple files with same field name
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/gallery' && req.method === 'POST') {
   *     const upload = multer({ storage: multer.memoryStorage() });
   *     return upload.array('photos', 10);
   *   }
   *   return null;
   * },
   * ```
   * @example
   * ```js
   * // Multiple file fields
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/admin/firms' && req.method === 'POST') {
   *     const upload = multer({ storage: multer.memoryStorage() });
   *     return upload.fields([
   *       { name: 'logo', maxCount: 1 },
   *       { name: 'eyecatch', maxCount: 1 }
   *     ]);
   *   }
   *   return null;
   * },
   * ```
   * @example
   * ```js
   * // With disk storage and file filtering
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/documents' && req.method === 'POST') {
   *     const storage = multer.diskStorage({
   *       destination: (req, file, cb) => {
   *         cb(null, 'uploads/');
   *       },
   *       filename: (req, file, cb) => {
   *         cb(null, `${Date.now()}-${file.originalname}`);
   *       }
   *     });
   *     const upload = multer({
   *       storage,
   *       fileFilter: (req, file, cb) => {
   *         // Accept only PDF files
   *         if (file.mimetype === 'application/pdf') {
   *           cb(null, true);
   *         } else {
   *           cb(new Error('Only PDF files are allowed'));
   *         }
   *       },
   *       limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
   *     });
   *     return upload.single('document');
   *   }
   *   return null;
   * },
   * ```
   */
  resolve_middleware: undefined
}
