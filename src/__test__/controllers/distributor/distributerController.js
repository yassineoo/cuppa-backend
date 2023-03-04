const { PrismaClient } = require('@prisma/client');
const fakeDistributors = require('../../../data');

const {
     getAllDistributors,
} = require('../../../dist/controllers/distributerController.js');
const prisma = new PrismaClient();

describe('getAllDistributors', () => {
     it('should return all distributors', async () => {
          // Arrange
          const mockDistributors = fakeDistributors;
          const mockReq = {};
          const mockRes = {
               status: jasmine.createSpy().and.returnValue({
                    json: jasmine.createSpy(),
               }),
          };

          spyOn(prisma.distributeur, 'findMany').and.returnValue(
               mockDistributors
          );

          // Act
          await getAllDistributors(mockReq, mockRes);

          // Assert
          expect(mockRes.status).toHaveBeenCalledWith(200);
          expect(mockRes.status(200).json).toHaveBeenCalledWith(
               mockDistributors
          );
          expect(prisma.distributeur.findMany).toHaveBeenCalled();
     });

     it('should return a 500 error if there is an error in the database query', async () => {
          // Arrange
          const mockReq = {};
          const mockRes = {
               status: jasmine
                    .createSpy()
                    .and.returnValue({ json: jasmine.createSpy() }),
          };
          spyOn(prisma.distributor, 'findMany').and.throwError(
               'Database query error'
          );

          // Act
          await getAllDistributors(mockReq, mockRes);

          // Assert
          expect(mockRes.status).toHaveBeenCalledWith(500);
          expect(prisma.distributor.findMany).toHaveBeenCalled();
     });
});
