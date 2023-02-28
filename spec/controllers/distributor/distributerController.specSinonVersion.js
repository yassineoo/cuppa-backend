const sinon = require('sinon');
const { PrismaClient } = require('@prisma/client');
const fakeDistributors = require('../../../data');
const prisma = new PrismaClient();

const {
     getAllDistributors,
} = require('../../../dist/controllers/distributerController.js');

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

          const findManyStub = sinon
               .stub(prisma.distributeur, 'findMany')
               .resolves(mockDistributors);

          // Act
          await getAllDistributors(mockReq, mockRes);

          // Assert
          expect(mockRes.status).toHaveBeenCalledWith(200);
          expect(mockRes.status(200).json).toHaveBeenCalledWith(
               mockDistributors
          );
          expect(findManyStub.calledOnce).toBeTruthy();

          // Clean up
          findManyStub.restore();
     });

     /* it('should return a 500 error if there is an error in the database query', async () => {
          // Arrange
          const mockReq = {};
          const mockRes = {
               status: jasmine
                    .createSpy()
                    .and.returnValue({ json: jasmine.createSpy() }),
          };
          const findManyStub = sinon.stub(prisma.distributeur, 'findMany').throws(new Error('Database query error'));

          // Act
          await getAllDistributors(mockReq, mockRes);

          // Assert
          expect(mockRes.status).toHaveBeenCalledWith(500);
          expect(findManyStub.calledOnce).toBeTruthy();

          // Clean up
          findManyStub.restore();
     });
     */
});
